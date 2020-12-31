import getShareImage from '@jlengstorf/get-share-image';

export const SOCIAL_IMAGE = {
    cloudName: 'raymons',
    imagePublicID: 'devbyrayray/blog/byrayray-blog-image-2',
    titleFont: 'Lora',
    taglineFont: 'futura',
    textColor: '232129',
    imageWidth: '1800',
    imageHeight: '1100',
    textAreaWidth: '750',
    textLeftOffset: '1000',
    taglineTopOffset: '700',
    titleBottomOffset: '300',
    titleFontSize: 70
    // titleExtraConfig: '_line_spacing_-20'
}



export const socialImage = (title, desc, image, template = '') => {
    if (!desc) {
        desc = ''
    }
    const newTitle = title.length > 80 ? `${title.substring(0, 80)}...` : title
    const newDesc = desc.length > 80 ? `${desc.substring(0, 80)}...` : desc
    if (template) {
        SOCIAL_IMAGE.imagePublicID = template
    }
    const url = getShareImage({
        title: newTitle,
        ...SOCIAL_IMAGE
    });
    const index = url.indexOf('load/')
    const domain = url.substring(0, index + 5);
    const rest = url.substring(index + 5)

    const validImage = validateImage(image)

    const imageFallback = `c_fill,d_${validImage},f_webp,g_north_west,h_1100`
    const imageLayer = `l_${validImage},w_900,x_0`

    return `${domain}/${imageLayer},${imageFallback}/${rest}`
}

export const coverImage = (image, template) => {
    SOCIAL_IMAGE.imagePublicID = 'devbyrayray/blog/byrayray-blog-image-5'
    SOCIAL_IMAGE.imageWidth = '1410';
    SOCIAL_IMAGE.imageHeight = '1099';

    const url = getShareImage({
        title: ' ',
        ...SOCIAL_IMAGE
    });
    const index = url.indexOf('load/')
    const domain = url.substring(0, index + 5);
    const rest = url.substring(index + 5)

    const validImage = validateImage(image)

    const imageFallback = `c_fill,d_${validImage},f_webp,g_north_west,h_890`
    const imageLayer = `l_${validImage},w_1410,x_0`

    return `${domain}/${imageLayer},${imageFallback}/${rest}`

}

function validateImage(image) {
    if (!image) {
        return 'devbyrayray:blog:blog-code-fallback'
    }
    const validImage = !image.startsWith('devbyrayray') ? 'devbyrayray:blog:blog-code-fallback' : image

    return validImage
}