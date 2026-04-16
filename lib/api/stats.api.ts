import api from "./axios"

export interface DashboardStats {
  totalDevis: number
  totalDevisThisMonth: number
  pendingDevis: number
  completedDevis: number
  activeClients: number
  totalRevenue: number
  monthlyRevenue: number
  monthlyChange: number
}

export interface RecentDevis {
  id: string
  reference: string
  clientName: string
  clientEmail: string
  clientPhone: string
  company: string | null
  service: string
  location: string
  status: string
  estimatedAmount: number
  createdAt: string
}

export interface ServiceStats {
  serviceName: string
  count: number
  percentage: number
}

export interface UpcomingIntervention {
  client: string
  service: string
  date: string
  technician: string
}

export interface DashboardData {
  stats: DashboardStats
  recentDevis: RecentDevis[]
  topServices: ServiceStats[]
  upcomingInterventions: UpcomingIntervention[]
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/api/stats/dashboard")
  return response.data
}

export const getRecentDevis = async (limit: number = 5): Promise<RecentDevis[]> => {
  try {
    const response = await api.get('/api/devis', { params: { limit, page: 1 } })
    return response.data.data || []
  } catch {
    return []
  }
}

export const getTopServices = async (): Promise<ServiceStats[]> => {
  return []
}

export const getDashboardData = async (): Promise<DashboardData> => {
  const [stats, recentDevis, topServices] = await Promise.all([
    getDashboardStats(),
    getRecentDevis(5),
    getTopServices(),
  ])
  return { 
    stats, 
    recentDevis, 
    topServices,
    upcomingInterventions: [
      { client: "Mairie de Cayenne", service: "FTTH - 50 prises", date: "18 Avr 2026", technician: "Jean-Marc" },
      { client: "Centre Commercial", service: "Maintenance trimestrielle", date: "20 Avr 2026", technician: "Sophie" },
      { client: "Lycée Melkior-Garré", service: "Dépannage réseau", date: "22 Avr 2026", technician: "Jean-Marc" },
    ]
  }
}