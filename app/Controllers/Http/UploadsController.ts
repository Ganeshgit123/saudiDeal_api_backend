import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'
import fs from 'fs'
import path from 'path'

export default class UploadsController {
  public async upload({ request, response }: HttpContextContract) {
    try {
      // choose uploads dir: use public uploads in production (inside build/public),
      // otherwise store uploads in project-root `/uploads` to persist across builds
      const uploadsDir = Env.get('NODE_ENV') === 'production'
        ? Application.publicPath('uploads')
        : path.join(Application.appRoot, 'uploads')
      await fs.promises.mkdir(uploadsDir, { recursive: true })

      // accept multiple common field names for uploaded file
      const fieldNames = ['file', 'image', 'avatar', 'photo']
      let file = null as any
      for (const name of fieldNames) {
        file = request.file(name, { size: '50mb' })
        if (file) break
      }

      if (!file) {
        return response.status(400).json({ success: false, msg: 'No file provided. Use form-data key `file` or `image`.' })
      }

      // basic validation
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf']
      // basic validation: accept image/*, generic 'image', application/pdf, or common mime types
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf']
      const fileType = (file.type || '').toString().toLowerCase()
      const ext = (file.extname || '').toString().toLowerCase()

      const isImageType = fileType === 'image' || fileType.startsWith('image/')
      const isAllowedType = allowedTypes.includes(fileType) || isImageType
      const isAllowedExt = ext && allowedExtensions.includes(ext.replace('.', ''))

      if (!isAllowedType && !isAllowedExt) {
        return response.status(415).json({ success: false, msg: 'Unsupported file type', type: file.type, ext })
      }

      const fileName = `${Date.now()}_${file.clientName}`

      await file.move(uploadsDir, {
        name: fileName,
        overwrite: true,
      })

      // Adonis multipart file doesn't have `isMoved()` in this setup.
      // Consider upload successful when there are no move errors.
      const moveErrors = Array.isArray((file as any).errors) ? (file as any).errors : []
      if (moveErrors.length === 0) {
        return response.json({
          success: true,
          filename: fileName,
          url: `/uploads/${fileName}`,
        })
      }

      return response.status(500).json({ success: false, msg: (file as any).errors || 'Unknown error while moving file' })
    } catch (error: any) {
      // log full error for debugging
      console.error('Upload error:', error)
      const isProd = Env.get('NODE_ENV') === 'production'
      return response.status(500).json({
        success: false,
        msg: 'Something went wrong while uploading the file',
        ...(isProd ? {} : { error: error.message, stack: error.stack }),
      })
    }
  }
}
