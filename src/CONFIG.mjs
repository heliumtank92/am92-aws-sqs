const {
  npm_package_name: pkgName = '',
  npm_package_version: pkgVersion = '',

  SQS_REGION = 'ap-south-1',

  SQS_ENABLED = 'false',
  SQS_QUEUE_URL = '',
  SQS_POLL_CRON_TIME = '',
  SQS_POLL_CRON_TIMEZONE = 'Asia/Kolkata',

  SQS_ATTRIBUTE_NAMES = 'All',
  SQS_MAX_NUMBER_OF_MESSAGES = 10,
  SQS_MESSAGE_ATTRIBUTE_NAMES = 'All',
  SQS_VISIBILITY_TIMEOUT = 30,
  SQS_WAIT_TIME_SECONDS = 0
} = process.env

const SERVICE = `${pkgName}@${pkgVersion}`
const fatalLogFunc = console.fatal || console.error

const ENABLED = SQS_ENABLED === 'true'

const REQUIRED_CONFIG = []
const MISSING_CONFIGS = []
const INT_CONFIGS = {
  SQS_MAX_NUMBER_OF_MESSAGES,
  SQS_VISIBILITY_TIMEOUT,
  SQS_WAIT_TIME_SECONDS
}
const INVALID_INT_CONFIG = {}

if (ENABLED) {
  REQUIRED_CONFIG.push('SQS_QUEUE_URL')
  REQUIRED_CONFIG.push('SQS_POLL_CRON_TIME')
}

REQUIRED_CONFIG.forEach(function (key) {
  if (!process.env[key]) {
    MISSING_CONFIGS.push(key)
  }
})

if (MISSING_CONFIGS.length) {
  fatalLogFunc(`[${SERVICE} AwsSqs] AwsSqs Config Missing: ${MISSING_CONFIGS.join(', ')}`)
  process.exit(1)
}

// Handle Invalid Configs
Object.keys(INT_CONFIGS).forEach(key => {
  const value = INT_CONFIGS[key]
  INT_CONFIGS[key] = parseInt(value, 10)

  if (isNaN(INT_CONFIGS[key])) {
    INVALID_INT_CONFIG[key] = value
  }
})

if (Object.keys(INVALID_INT_CONFIG).length) {
  fatalLogFunc(`[${SERVICE} AwsSqs] Invalid AwsSqs Integer Configs:`, INVALID_INT_CONFIG)
  process.exit(1)
}

const CONNECTION_CONFIG = { region: SQS_REGION }

const CONFIG = {
  CONNECTION_CONFIG,
  QUEUE_URL: SQS_QUEUE_URL,

  POLL_CRON_TIME: SQS_POLL_CRON_TIME,
  POLL_CRON_TIMEZONE: SQS_POLL_CRON_TIMEZONE,

  RECEIVE_OPTIONS: {
    ATTRIBUTE_NAMES: SQS_ATTRIBUTE_NAMES.split(','),
    MAX_NUMBER_OF_MESSAGES: INT_CONFIGS.SQS_MAX_NUMBER_OF_MESSAGES,
    MESSAGE_ATTRIBUTE_NAMES: SQS_MESSAGE_ATTRIBUTE_NAMES.split(','),
    VISIBILITY_TIMEOUT: INT_CONFIGS.SQS_VISIBILITY_TIMEOUT,
    WAIT_TIME_SECONDS: INT_CONFIGS.SQS_WAIT_TIME_SECONDS
  }
}

export default CONFIG

export { SERVICE }
