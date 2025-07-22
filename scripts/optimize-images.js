import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const inputDir = './public'
const outputDir = './public/optimized'

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const optimizeImages = async () => {
  const files = fs.readdirSync(inputDir).filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  )

  console.log(`Optimizing ${files.length} images...`)

  for (const file of files) {
    const inputPath = path.join(inputDir, file)
    const name = path.parse(file).name
    
    // Generate multiple optimized sizes
    const sizes = [
      { width: 400, height: 400, suffix: '400', webpQuality: 95, jpgQuality: 95 },
      { width: 600, height: 600, suffix: '600', webpQuality: 95, jpgQuality: 95 },
      { width: 800, height: 800, suffix: '800', webpQuality: 95, jpgQuality: 95 }, // Hero images: highest quality
      { width: 800, height: 450, suffix: '800x450', webpQuality: 95, jpgQuality: 95 },
      { width: 600, height: 400, suffix: '600x400', webpQuality: 95, jpgQuality: 95 }
    ]

    for (const size of sizes) {
      // WebP version (best compression)
      await sharp(inputPath)
        .resize(size.width, size.height, { fit: 'cover', position: 'center' })
        .webp({ quality: size.webpQuality, effort: 6 })
        .toFile(`${outputDir}/${name}-${size.suffix}.webp`)

      // JPG fallback
      await sharp(inputPath)
        .resize(size.width, size.height, { fit: 'cover', position: 'center' })
        .jpeg({ quality: size.jpgQuality, progressive: true })
        .toFile(`${outputDir}/${name}-${size.suffix}.jpg`)
    }
    
    console.log(`✓ Optimized ${file}`)
  }
  
  console.log('All images optimized!')
}

optimizeImages().catch(console.error) 