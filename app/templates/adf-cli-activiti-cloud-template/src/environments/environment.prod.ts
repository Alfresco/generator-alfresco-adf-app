import { AppConfigService } from '@alfresco/adf-core';
import { ApplicationDeploymentService } from '../app/services/application-deployment.service';

export const environment = {
  production: true,
  appConfigServiceType: AppConfigService,
  applicationDeploymentService: ApplicationDeploymentService
};
