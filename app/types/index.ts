

export type User = {
    _id?: string;
    contact: string;
    name?: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export type Car = {
    _id: string;
    model: Model;
    marque: Marque;
    annee: string;
    images: ImageType[];
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export type ImageType = {
    url: string;
    createdAt: string;
}

export type Depense = {
    _id: string;
    date: string;
    montant: number;
    quantite: number;
    type_depense: string;
    description: string;
    vehiculeId: string;
    createdAt: string;
    updatedAt: string;
}

export type Model = {
    _id: string;
    libelle: string;
}
export type Marque = {
    _id: string;
    libelle: string;
}


export type ActionType = {
    type: string;
    payload: User;
}


export type UserRootState = {
    user: User;
    login: boolean;
}

export type GlobalUserState = {
    User: UserRootState;
}

export type FileDataType = {
    mimeType: string;
    name: string;
    size: number;
    uri: string;
}


export type DropdownItemType = {
    label: string;
    value: string;
}

export type Period = {
    libelle: string;
    value: string;
}