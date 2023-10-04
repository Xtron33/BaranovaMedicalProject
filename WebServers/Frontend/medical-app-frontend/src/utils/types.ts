export interface IUserData {
    email: string
    password: string
    role: string
}

export interface IResponceUserData{
    email: string | undefined
    password: string | undefined
    createdAt: string | undefined
    updatedAt: string | undefined
    _id?: string | undefined
    message: string | undefined

}