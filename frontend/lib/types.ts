export type LoginInput = {
  email: string;
  password: string;
};
export type RegisterInput = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};
export type Reclamation = {
  id: number;
  sujet: string;
  description: string;
  status: string;
  documnets: Document[],
  user: User,
}


export type ResetPasswordInput = {
  currentPassword: string,
  newPassword: string,
  confirmationPassword: string
}

export type CreateReclamationInput = {
  objetId: number;
  sujet: string;
  description: string;
  docs: File[];
}

export type AddItemInput = {
  name: string,
  description: string;
  images: File[];
}
export type EditProfileInput = {
  firstname: string,
  lastname: string,
  email: string,
}
export interface ErrorResponse {
  success: boolean;
  message: string;
  timestamp: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export type Notification = {
  id: string,
  receivedAt: string,
}

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  authorities: { authority: string }[];
  isEnabled: boolean;
  enabled: boolean;
};

export type AuthResponse = {
  token: string;
  user: User;
};


export type Image = {
  id: number;
  imageUrl: string;
  item: null;
};

export type Document = {
  id: number;
  documentUrl: string;
  item: null;
};

export type Item = {
  id: number;
  name: string;
  description: string;
  foundDateTime: string;
  images: Image[];
};

export type Pagination = {
  pageNumber: number;
  pageSize: number;
}

export type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
};



export type Page<T> = {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};
