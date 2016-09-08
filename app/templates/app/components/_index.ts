<%- licenseHeader %>
export { LoginDemoComponent } from './login/login-demo.component';
<% if (contentPage == true) { %>export { FilesComponent } from './files/files.component';<% } %>
<% if (searchBar == true) { %>export { SearchComponent } from './search/search.component';<% } %>
<% if (searchBar == true) { %>export { SearchBarComponent } from './search/search-bar.component';<% } %>
<% if (bpmTaskPage == true) { %>export { ActivitiDemoComponent } from './tasks/activiti-demo.component';<% } %>
<% if (chartPage == true) { %>export { ChartComponent } from './chart/chart.component';<% } %>
