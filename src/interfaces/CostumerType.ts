interface CustomerReview {
  name: string
  title: string
  text: string
  image: string
}

interface CustomerIcons {
  quote: string
  stars: string
  verified: string
}

export interface CustomerSection {
  reviews: CustomerReview[]
  icons: CustomerIcons
}
