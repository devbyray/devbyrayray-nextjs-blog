import getShareImage from '@jlengstorf/get-share-image';

export const SOCIAL_IMAGE = {
    cloudName: 'raymons',
    imagePublicID: 'devbyrayray/blog/blog-template-3a',
    titleFont: 'futura',
    taglineFont: 'futura',
    textColor: '232129',
    imageWidth: '1800',
    imageHeight: '1100',
    textAreaWidth: '800',
    textLeftOffset: '850',
    taglineTopOffset: '700',
    titleBottomOffset: '450',
    titleExtraConfig: '_line_spacing_-10'
}

export const socialImage = (title, desc, image) => {
    const newTitle = title.length > 80 ? `${title.substring(0, 80)}...` : title
    const newDesc = desc.length > 80 ? `${desc.substring(0, 80)}...` : desc
    const url = getShareImage({
        title: newTitle,
        tagline: newDesc,
        ...SOCIAL_IMAGE
    });
    const index = url.indexOf('load/')
    const domain = url.substring(0, index + 5);
    const rest = url.substring(index + 5)

    const validImage = validateImage(image)

    const imageFallback = `c_fill,d_${validImage},f_webp,g_north_west,h_1100`
    const imageLayer = `l_${validImage},w_605,x_0`

    return `${domain}/${imageLayer},${imageFallback}/${rest}`
}

function validateImage(image) {
    if (!image) {
        return 'devbyrayray:blog:blog-code-fallback'
    }
    const validImage = !image.startsWith('devbyrayray') ? 'devbyrayray:blog:blog-code-fallback' : image

    return validImage
}