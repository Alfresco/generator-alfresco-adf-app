<%- licenseHeader %>

export { LoginDemoComponent } from './login/login-demo.component';
export { SettingComponent } from './setting/setting.component';
export { HomeComponent } from './home/home.component';
export { AboutComponent } from './about/about.component';
<% if (contentPage == true) { %>export { FilesComponent } from './files/files.component';<% } %>
<% if (searchBar == true) { %>export { SearchComponent } from './search/search.component';
export { SearchBarComponent } from './search/search-bar.component';<% } %>
<% if (bpmTaskPage == true) { %>export { FormNodeViewer } from './activiti/form-node-viewer.component';
export { ActivitiDemoComponent } from './activiti/activiti-demo.component';
export { FormViewer } from './activiti/form-viewer.component';
export { ActivitiAppsView } from './activiti/apps.view';<% } %>



