import os from 'os'

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

// Helper function to format uptime in hours, minutes, and seconds
export function formatUptime(seconds: number) {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hrs}h ${mins}m ${Math.ceil(secs)}s`
}

const cpuUsagePercentLast50Entrires: [Date, number][] = []

setInterval(() => {
  // get CPU percent utilization
  const cpuUsage = os.loadavg()[0] / os.cpus().length
  cpuUsagePercentLast50Entrires.push([new Date(), cpuUsage * 100])

  if (cpuUsagePercentLast50Entrires.length > 50) {
    cpuUsagePercentLast50Entrires.shift()
  }
}, 3000)

// eslint-disable-next-line @typescript-eslint/require-await
export async function getSystemStats() {
  return {
    platform: os.platform(),
    architecture: os.arch(),
    cpu: os.cpus().map(cpu => cpu.model)[0], // Model of the first CPU
    cpuCores: os.cpus().length,
    cpuUsage: `${os.loadavg()[0].toFixed(2)} (1 min avg)`, // System load for the last minute
    totalMemory: formatBytes(os.totalmem()),
    totalMemoryBytes: os.totalmem(),
    freeMemory: formatBytes(os.freemem()),
    freeMemoryBytes: os.freemem(),
    memoryUsage: `${((1 - os.freemem() / os.totalmem()) * 100).toFixed(2)}%`, // Memory usage percentage
    uptime: formatUptime(os.uptime()),
    networkInterfaces: os.networkInterfaces(),
    homeDirectory: os.homedir(),
    hostname: os.hostname(),
    cpuUsagePercentLast50Entrires
  }
}
