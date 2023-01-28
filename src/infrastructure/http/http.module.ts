import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { HttpService, HttpModule as BaseHttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as https from 'https';
import * as http from 'https';

@Module({
  imports: [
    BaseHttpModule.register({
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
    }),
  ],
  providers: [ConfigService],
  exports: [BaseHttpModule],
})
export class HttpModule implements OnModuleInit {
  private readonly logger = new Logger('Axios');

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit(): any {
    const axios = this.httpService.axiosRef;

    axios.interceptors.request.use((config) => {
      config['metadata'] = {
        ...config['metadata'],
        startDate: new Date(),
      };

      if (!this.disableLogForURL(config.url)) {
        this.logger.debug('Request');
        this.logger.debug({
          method: config.method,
          url: config.url ? scrubUrl(config.url) : undefined,
          headers: config.headers,
          data: config.data,
        });
      }
      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        const { config } = response;
        const now = new Date().getTime();
        const timeLapsed = now - config['metadata'].startDate.getTime();

        if (!this.disableLogForURL(config.url)) {
          this.logger.debug('Response');
          this.logger.debug({
            status: response.status,
            data: response.data,
          });
          this.logger.debug(`Time lapsed: ${timeLapsed}ms`);
        }
        return response;
      },
      (err) => {
        this.logger.error('Response');
        this.logger.error({
          method: err.request.method,
          url: err.request.url ? scrubUrl(err.request.url) : undefined,
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data,
        });
        return err.response;
      },
    );
  }

  private disableLogForURL(url: string | undefined): boolean {
    // we want the default to not log health check
    const enableHealthCheckLoggingEnv: string =
      this.configService.get('HEALTH_CHECK_LOGGING') ?? 'false';
    const logHealthCheck = Boolean(
      enableHealthCheckLoggingEnv.toLowerCase() === 'true',
    );

    const surveyVendor = this.configService.get('SURVEY_VENDOR_HOST');
    const wholesalerPortal = this.configService.get('WHOLESALER_PORTAL_URL');

    // urls that we do not want to log
    const healthCheckURLs = [
      `${wholesalerPortal}health`,
      `${surveyVendor}domain`,
    ];

    if (url && !logHealthCheck) {
      const baseURL = new URL(url);
      return healthCheckURLs.includes(baseURL.origin + baseURL.pathname);
    }

    return false;
  }
}

export const scrubUrl = (urlString: string): string => {
  const parametersToScrub = ['api_token', 'api_token_secret', 'xAccessKey'];

  let urlAndPath;
  let params = new URLSearchParams();

  try {
    const url = new URL(urlString);
    params = url.searchParams;
    urlAndPath = url.origin + url.pathname;
  } catch (e) {
    let rawParamString: string;
    [urlAndPath, rawParamString] = urlString.split('?');
    params = new URLSearchParams(rawParamString);
  }

  parametersToScrub.forEach((eachParam: string) => {
    if (params.has(eachParam)) {
      const length = params.get(eachParam)?.length || 1;
      params.set(eachParam, '*'.repeat(length));
    }
  });

  return `${urlAndPath}?${params.toString()}`;
};
