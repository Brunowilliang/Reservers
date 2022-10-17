export interface Profiles {
  id: string   /* primary key */;
  name?: string;
  created_at?: string;
  provider?: boolean;
  provider_name?: string;
  city?: string;
};

export interface Professionals {
  id: string   /* primary key */;
  name?: string;
  created_at?: string;
  profile_id?: string   /* foreign key to profiles.id */;
  profiles?: Profiles;
};

export interface Services {
  id: string   /* primary key */;
  professional_id?: string   /* foreign key to professionals.id */;
  name?: string;
  price?: string;
  duration?: any // type unknown;
  created_at?: string;
  professionals?: Professionals;
};

export interface Schedules {
  id: number   /* primary key */;
  profile_id?: string   /* foreign key to profiles.id */;
  professional_id?: string   /* foreign key to professionals.id */;
  service_id?: string   /* foreign key to services.id */;
  day?: string;
  hour?: string;
  created_at?: string;
  user_id?: string   /* foreign key to profiles.id */;
  profiles?: Profiles;
  professionals?: Professionals;
  services?: Services;
};

export interface HoursAvailable {
  hour?: string;
  isAvailable?: boolean;
}
