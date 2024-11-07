import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { EnsinoComponent } from "./views/atividades/ensino/ensino.component";
import { AtividadesComponent } from "./views/atividades/atividades.component";
import { PesquisaComponent } from "./views/atividades/pesquisa/pesquisa.component";

// components for views and layouts

import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { ModalSearchComponent } from "./components/modalSearch/modal-search.component";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./components/cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { AtividadesDropdownComponent } from "./components/dropdowns/atividades-dropdown/atividades-dropdown.component";
import { ExtensaoComponent } from "./views/atividades/extensao/extensao.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";
import { NoticiasComponent } from "./views/noticias/noticias.component";
import { ProcessoSeletivoComponent } from "./views/processoSeletivo/processoSeletivo.component";
import { SobreComponent } from "./views/sobre/sobre.component";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { TimestepsComponent } from "./components/timesteps/timesteps.component";
import { ArvoreCargosComponent } from "./components/arvoreCargos/arvoreCargos.component";
import { BackgroundJorneqComponentComponent } from "./components/backgrounds/background-jorneq-component.component";
import { BotaoPrincipalJorneqComponent } from "./components/botoes/jorneq/botao-principal-jorneq.component";
import { BotaoSecundarioJorneqComponent } from "./components/botoes/jorneq/botao-secundario-jorneq.component";
import { NavBarJorneqComponent } from "./components/navbars/jorneq-navbar/navbar-jorneq.component";
import { JorneqIndexComponent } from "./layouts/jorneq/jorneq-index.component";
import { JorneqComponent } from "./views/jorneq/jorneq.component";
import { ParticipeComponent } from "./views/jorneq/participe/participe.component";
import { ResponsaveisComponent } from "./views/jorneq/responsaveis/responsaveis.component";
import { SobreJorneqComponent } from "./views/jorneq/sobre/sobre-jorneq.component";
import { ContatoJorneqComponent } from "./views/jorneq/contato-jorneq/contato-jorneq.component";
import { MsalModule, MsalInterceptor, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalInterceptorConfiguration, MsalRedirectComponent, MsalGuard } from "@azure/msal-angular";
import { PublicClientApplication, InteractionType } from "@azure/msal-browser";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { msalConfig } from "./auth-config";
import { IntegrantesComponent } from "./views/admin/integrantes/integrantes.component";
import { ModalGenericoComponent } from "./components/modal-generico/modal-generico.component";
import { PlanejamentoRelatorioComponent } from "./views/admin/planejamentoRelatorio/planejamentoRelatorio.component";
import { ProcessoSeletivoAdminComponent } from "./views/admin/processoSeletivo/processoSeletivoAdmin.component";
import { PesquisaAdminComponent } from "./views/admin/pesquisa/pesquisa.component";
import { ExtensaoAdminComponent } from "./views/admin/extensao/extensao.component";
import { MinicursosAdminComponent } from "./views/admin/minicursos/minicursos.component";
import { CalendarioAtividadesAdminComponent } from "./views/admin/calendarioAtividades/calendarioAtividades.component";
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    AtividadesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    ModalSearchComponent,
    PaginationComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    AuthComponent,
    MapsComponent,
    SettingsComponent,
    TablesComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    LandingComponent,
    ProfileComponent,
    EnsinoComponent,
    AtividadesComponent, 
    PesquisaComponent,
    ExtensaoComponent,
    NoticiasComponent,
    ProcessoSeletivoComponent,
    SobreComponent,
    TimestepsComponent,
    ArvoreCargosComponent,
    BackgroundJorneqComponentComponent,
    BotaoPrincipalJorneqComponent,
    BotaoSecundarioJorneqComponent,
    NavBarJorneqComponent,
    JorneqIndexComponent,
    JorneqComponent,
    ParticipeComponent,
    ResponsaveisComponent,
    SobreJorneqComponent,
    ContatoJorneqComponent,
    IntegrantesComponent,
    ModalGenericoComponent,
    PlanejamentoRelatorioComponent,
    ProcessoSeletivoAdminComponent,
    PesquisaAdminComponent,
    ExtensaoAdminComponent,
    MinicursosAdminComponent,
    CalendarioAtividadesAdminComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, NoopAnimationsModule, MatNativeDateModule , ReactiveFormsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    FormsModule,
    CommonModule,
    MsalModule.forRoot(new PublicClientApplication(msalConfig), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
            authRequest: {
              scopes: ["User.Read.All"],
            },
    }, 
    {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([
        ["https://graph.microsoft.com/v1.0/me", ["User.Read.All"]],
      ]),
    }),
   ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalGuard,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}

