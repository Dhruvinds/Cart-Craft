const { createLogger, format, transports } = require("winston");

module.exports = createLogger({
  transports: new transports.File({
    filename: "logs/filelog-info.log",
    format: format.combine(
      format.timestamp({ format: "DD-MMM-YYYY HH:mm:ss" }),
      format.align(),
      format.printf(
        (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
  }),
});
