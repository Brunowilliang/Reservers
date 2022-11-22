/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Professionals = "professionals",
	Schedules = "schedules",
	Services = "services",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: { [key: string]: any }
}

export type AuthSystemFields = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields

// Record types for each collection

export type ProfessionalsRecord = {
	name?: string
	company?: RecordIdString
}

export type SchedulesRecord = {
	provider?: RecordIdString
	user?: RecordIdString
	professional?: RecordIdString
	service?: RecordIdString
	day?: string
	hour?: string
}

export type ServicesRecord = {
	name?: string
	price?: string
	duration?: string
	professional?: RecordIdString
}

export type UsersRecord = {
	company_name?: string
	name?: string
	avatar?: string
	phone?: string
	cpf?: string
	cnpj?: string
	provider?: boolean
	city?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ProfessionalsResponse = ProfessionalsRecord & BaseSystemFields
export type SchedulesResponse = SchedulesRecord & BaseSystemFields
export type ServicesResponse = ServicesRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	professionals: ProfessionalsRecord
	schedules: SchedulesRecord
	services: ServicesRecord
	users: UsersRecord
}