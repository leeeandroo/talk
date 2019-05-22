import uuid from "uuid";

import { LanguageCode } from "coral-common/helpers/i18n/locales";
import { Config } from "coral-server/config";
import logger, { Logger } from "coral-server/logger";
import { User } from "coral-server/models/user";
import { I18n } from "coral-server/services/i18n";
import { Request } from "coral-server/types/express";

export interface CommonContextOptions {
  id?: string;
  now?: Date;
  user?: User;
  req?: Request;
  logger?: Logger;
  lang?: LanguageCode;
  config: Config;
  i18n: I18n;
}

export default class CommonContext {
  public readonly user?: User;
  public readonly req?: Request;
  public readonly id: string;
  public readonly config: Config;
  public readonly i18n: I18n;
  public readonly lang: LanguageCode;
  public readonly now: Date;
  public readonly logger: Logger;

  constructor({
    id = uuid.v1(),
    now = new Date(),
    logger: log = logger,
    user,
    req,
    config,
    i18n,
    lang = i18n.getDefaultLang(),
  }: CommonContextOptions) {
    this.id = id;
    this.logger = log.child({
      context: "graph",
      contextID: id,
    });
    this.now = now;
    this.user = user;
    this.req = req;
    this.config = config;
    this.i18n = i18n;
    this.lang = lang;
  }
}