export interface Person {
  name: string;
  title: string;
  photo?: string;
}

export interface CapabilityLead {
  name: string;
  specialization?: string;
}

export interface Offering {
  id: string;
  name: string;
  practiceLead: string;
  capabilityLeads: CapabilityLead[];
}

export interface EnablementChampion {
  name: string;
  role: string;
}

export interface AtcpSongData {
  songLead: Person;
  regionalLeads: Person[];
  offerings: Offering[];
  enablementChampions: EnablementChampion[];
}
