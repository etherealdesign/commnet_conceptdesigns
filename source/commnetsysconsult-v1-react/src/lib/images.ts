const B = `${import.meta.env.BASE_URL}images/`

export const IMG = {
  executiveGlass: `${B}executive-glass.jpg`,
  professionalIt: `${B}professional-it.jpg`,
  energyUtilities: `${B}energy-utilities.jpg`,
  powerInfrastructure: `${B}power-infrastructure.jpg`,
  securityOperations: `${B}security-operations.jpg`,
  enterpriseSystems: `${B}enterprise-systems.jpg`,
  avCommandCenter: `${B}av-command-center.jpg`,
  iotSmartBuilding: `${B}iot-smart-building.jpg`,
  dubaiSkyline: `${B}dubai-skyline.jpg`,
  securitySystems: `${B}security-systems.jpg`,
  infrastructureFiber: `${B}infrastructure-fiber.jpg`,
  logoLight: `${B}logo-light.png`,
  logoDark: `${B}logo-dark.png`,
} as const

export type ImgKey = keyof typeof IMG
