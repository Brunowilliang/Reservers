export interface User {
  id: string;
  username: string;
  email: string;
  emailVisibility: boolean;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  city: string;
  cpf: string;
  cnpj: string;
  provider: boolean;
  company_name: string;
}

export type Schedules = {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Array<{
    collectionId: string
    collectionName: string
    created: string
    day: string
    expand: {
      professional: {
        collectionId: string
        collectionName: string
        company: string
        created: string
        id: string
        name: string
        updated: string
      }
      provider: {
        avatar: string
        city: string
        cnpj: string
        collectionId: string
        collectionName: string
        company_name: string
        cpf: string
        created: string
        email: string
        emailVisibility: boolean
        id: string
        name: string
        phone: string
        provider: boolean
        updated: string
        username: string
        verified: boolean
      }
      service: {
        collectionId: string
        collectionName: string
        created: string
        duration: string
        id: string
        name: string
        price: string
        professional: Array<string>
        updated: string
      }
      user: {
        avatar: string
        city: string
        cnpj: string
        collectionId: string
        collectionName: string
        company_name: string
        cpf: string
        created: string
        email: string
        emailVisibility: boolean
        id: string
        name: string
        phone: string
        provider: boolean
        updated: string
        username: string
        verified: boolean
      }
    }
    hour: string
    id: string
    professional: string
    provider: string
    service: string
    updated: string
    user: string
  }>
}


export type Professionals = {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Array<{
    collectionId: string
    collectionName: string
    company: string
    created: string
    expand: {
      company: {
        avatar: string
        city: string
        cnpj: string
        collectionId: string
        collectionName: string
        company_name: string
        cpf: string
        created: string
        email: string
        emailVisibility: boolean
        id: string
        name: string
        phone: string
        provider: boolean
        updated: string
        username: string
        verified: boolean
      }
    }
    id: string
    name: string
    updated: string
  }>
}

export type Services = {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: Array<{
    collectionId: string
    collectionName: string
    created: string
    duration: string
    expand: {
      professional: Array<{
        collectionId: string
        collectionName: string
        company: string
        created: string
        id: string
        name: string
        updated: string
      }>
    }
    id: string
    name: string
    price: string
    professional: Array<string>
    updated: string
  }>
}
