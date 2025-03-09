import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";
import { JorneqIndexComponent } from "./layouts/jorneq/jorneq-index.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

//jorneq views
import { JorneqComponent } from "./views/jorneq/jorneq.component";
import { ParticipeComponent } from "./views/jorneq/participe/participe.component";

import { SobreJorneqComponent } from "./views/jorneq/sobre/sobre-jorneq.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { EnsinoComponent } from "./views/atividades/ensino/ensino.component";
import { AtividadesComponent } from "./views/atividades/atividades.component";
import { PesquisaComponent } from "./views/atividades/pesquisa/pesquisa.component";
import { ExtensaoComponent } from "./views/atividades/extensao/extensao.component";
import { NoticiasComponent } from "./views/noticias/noticias.component";
import { ProcessoSeletivoComponent } from "./views/processoSeletivo/processoSeletivo.component";
import { SobreComponent } from "./views/sobre/sobre.component";
import { ContatoJorneqComponent } from "./views/jorneq/contato-jorneq/contato-jorneq.component";
import { MsalGuard } from "@azure/msal-angular";
import { BrowserUtils } from "@azure/msal-browser";
import { IntegrantesComponent } from "./views/admin/integrantes/integrantes.component";
import { PlanejamentoRelatorioComponent } from "./views/admin/planejamentoRelatorio/planejamentoRelatorio.component";
import { ProcessoSeletivoAdminComponent } from "./views/admin/processoSeletivo/processoSeletivoAdmin.component";
import { PesquisaAdminComponent } from "./views/admin/pesquisa/pesquisa.component";
import { ExtensaoAdminComponent } from "./views/admin/extensao/extensao.component";
import { MinicursosAdminComponent } from "./views/admin/minicursos/minicursos.component";
import { CalendarioAtividadesAdminComponent } from "./views/admin/calendarioAtividades/calendarioAtividades.component";
import { EstiloJorneqComponent } from "./views/admin/estilo-jorneq/estilo-jorneq.component";
import { ManutencaoComponent } from "./views/manutencao/manutencao.component";
const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [MsalGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "integrantes", component: IntegrantesComponent },
      { path: "planejamentoRelatorio", component: PlanejamentoRelatorioComponent},
      { path: "processoSeletivo", component: ProcessoSeletivoAdminComponent},
      { path: "extensao", component: ExtensaoAdminComponent},
      { path: "pesquisa", component: PesquisaAdminComponent},
      { path: "minicursos", component: MinicursosAdminComponent},
      { path: "calendarioAtividades", component: CalendarioAtividadesAdminComponent},
      { path: "estiloJorneq", component: EstiloJorneqComponent},
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "profile", component: ProfileComponent },
  { path: "atividades/ensino", component: EnsinoComponent },
  { path: "atividades", component: AtividadesComponent},
  { path: "atividades/pesquisa", component: PesquisaComponent},
  { path: "atividades/extensao", component: ExtensaoComponent},
  { path: "", component: LandingComponent },
  { path: "page", component: IndexComponent },
  { path: "noticias", component: ManutencaoComponent},
  { path: "processoSeletivo", component:ProcessoSeletivoComponent},
  { path: "sobre", component:SobreComponent},
  // {
  //   path: "jorneq",
  //   component: JorneqIndexComponent,
  //   children:[
  //     {path:"", component: JorneqComponent},
  //     {path:"participe", component: ParticipeComponent},
  //     {path:"sobre", component: SobreJorneqComponent},
  //     {path:"contato", component: ContatoJorneqComponent}
  //   ]
  // },
  { path: "**", redirectTo: "", pathMatch: "full" }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Don't perform initial navigation in iframes or popups
    initialNavigation:
      !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
        ? "enabledNonBlocking"
        : "disabled", // Set to enabledBlocking to use Angular Universal
  }),],
  exports: [RouterModule],
})
export class AppRoutingModule {}
