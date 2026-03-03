type FileData = {
    path: string
    content: string
}

type Status = {
    isOpen: boolean
    errorMessage?: string
}

type DatabaseData = {
    connectionUrl: string
    credentials: string
}

type AccessedFieldData = FileData & Status
type AccessedDatabaseData = DatabaseData & Status
