import { RouteObject } from 'react-router-dom'
import TermsOfService from 'pages/TermsOfService'
import PrivacyPolicy from 'pages/PrivacyPolicy'

const generalRoutes: RouteObject[] = [
  {
    path: 'terms-of-service',
    element: TermsOfService()
  },
  {
    path: 'privacy-policy',
    element: PrivacyPolicy()
  }
]

export default generalRoutes
