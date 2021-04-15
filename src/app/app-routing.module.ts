import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate : [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'registro-cuenta',
    loadChildren: () => import('./registro-cuenta/registro-cuenta.module').then( m => m.RegistroCuentaPageModule)
  },
  {
    path: 'registro-exvotos',
    loadChildren: () => import('./registro-exvotos/registro-exvotos.module').then( m => m.RegistroExvotosPageModule)
  },
  {
    path: 'registro-intenciones',
    loadChildren: () => import('./registro-intenciones/registro-intenciones.module').then( m => m.RegistroIntencionesPageModule)
  },
  {
    path: 'coronilla',
    loadChildren: () => import('./coronilla/coronilla.module').then( m => m.CoronillaPageModule)
  },
  {
    path: 'devocionario',
    loadChildren: () => import('./devocionario/devocionario.module').then( m => m.DevocionarioPageModule)
  },
  {
    path: 'dolorosos',
    loadChildren: () => import('./dolorosos/dolorosos.module').then( m => m.DolorososPageModule)
  },
  {
    path: 'donacion',
    loadChildren: () => import('./donacion/donacion.module').then( m => m.DonacionPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'gloriosos',
    loadChildren: () => import('./gloriosos/gloriosos.module').then( m => m.GloriososPageModule)
  },
  {
    path: 'gozosos',
    loadChildren: () => import('./gozosos/gozosos.module').then( m => m.GozososPageModule)
  },
  {
    path: 'luminosos',
    loadChildren: () => import('./luminosos/luminosos.module').then( m => m.LuminososPageModule)
  },
  {
    path: 'reproductor',
    loadChildren: () => import('./reproductor/reproductor.module').then( m => m.ReproductorPageModule)
  },
  {
    path: 'romeria',
    loadChildren: () => import('./romeria/romeria.module').then( m => m.RomeriaPageModule)
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
  },
  {
    path: 'olvido-contrasena',
    loadChildren: () => import('./olvido-contrasena/olvido-contrasena.module').then( m => m.OlvidoContrasenaPageModule)
  },
  {
    path: 'registro-datos',
    loadChildren: () => import('./registro-datos/registro-datos.module').then( m => m.RegistroDatosPageModule)
  },
  {
    path: 'ajustes-perfil',
    loadChildren: () => import('./ajustes-perfil/ajustes-perfil.module').then( m => m.AjustesPerfilPageModule)
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule)
  },
  {
    path: 'nueva-romeria',
    loadChildren: () => import('./nueva-romeria/nueva-romeria.module').then( m => m.NuevaRomeriaPageModule)
  },
  {
    path: 'continuar-romeria',
    loadChildren: () => import('./continuar-romeria/continuar-romeria.module').then( m => m.ContinuarRomeriaPageModule)
  },
  {
    path: 'romeria-perfil',
    loadChildren: () => import('./romeria-perfil/romeria-perfil.module').then( m => m.RomeriaPerfilPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }