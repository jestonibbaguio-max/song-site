export interface MarketLead {
  id: number;
  name: string;
  role: string;
  initials: string;
  photo?: string;
  avatarColor?: string;
}

export interface PracticeLead {
  id: number;
  category: string;
  name: string;
  initials: string;
  photo?: string | null;
  avatarColor?: string;
}

export interface CapabilityMember {
  name: string;
  initials: string;
  photo?: string;
  avatarColor?: string;
}

export interface CapabilityGroup {
  subcategory: string | null;
  members: CapabilityMember[];
}

export interface CapabilityLead {
  id: number;
  category: string;
  groups: CapabilityGroup[];
}

export interface CoLead {
  name: string;
  initials: string;
  photo?: string;
  avatarColor?: string;
}

export interface EnablementChampion {
  id: number;
  name: string;
  role: string;
  initials: string;
  photo?: string;
  avatarColor?: string;
  coLead?: CoLead;
}

export interface LeadershipData {
  marketLeads: MarketLead[];
  practiceLeads: PracticeLead[];
  capabilityLeads: CapabilityLead[];
  enablementChampions: EnablementChampion[];
}
