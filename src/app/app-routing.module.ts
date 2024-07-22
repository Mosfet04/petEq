import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

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
import { ExtensaoComponent } from "./views/atividades/extensao/extensao.component";
import { NoticiasComponent } from "./views/noticias/noticias.component";
import { ProcessoSeletivoComponent } from "./views/processoSeletivo/processoSeletivo.component";
import { SobreComponent } from "./views/sobre/sobre.component";

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
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
  { path: "noticias", component: NoticiasComponent},
  { path: "processoSeletivo", component:ProcessoSeletivoComponent},
  { path: "sobre", component:SobreComponent},
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
