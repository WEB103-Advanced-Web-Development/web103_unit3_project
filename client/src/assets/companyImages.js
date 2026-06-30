import amazon from './amazon.png'
import azure from './azure.svg'
import google from './google.jpg'
import linkedin from './linkedin.jpg'
import vercel from './logo-vercel.png'
import meta from './meta.jpg'
import nvidia from './nvidia.jpg'
import stripe from './stripe.png'

// keyed by the lowercased `company` value stored on each event
const companyImages = {
    google,
    microsoft: azure,
    stripe,
    vercel,
    meta,
    nvidia,
    amazon,
    linkedin,
}

// returns the local logo for a company, falling back to whatever image the API provides
export const getCompanyImage = (company, fallback) => {
    if (!company) return fallback
    return companyImages[company.toLowerCase()] || fallback
}

export default companyImages
