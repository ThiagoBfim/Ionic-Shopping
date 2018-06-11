import { SigninPage } from './../pages/signin/signin';
import { RecipePage } from './../pages/recipe/recipe';
import { RecipesPage } from './../pages/recipes/recipes';
import { EditRecipePage } from './../pages/edit-recipe/edit-recipe';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { TabsPage } from '../pages/tabs/tabs';
import { ShoppingListService } from '../service/shopping';
import { RecipesService } from '../service/recipe';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../service/auth';
import { SLOptionsPage } from '../pages/shopping-list/sl-options/sl-options';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    EditRecipePage,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    TabsPage,
    SignupPage,
    SigninPage,
    SLOptionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipePage,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    TabsPage,
    SignupPage,
    SigninPage,
    SLOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService, RecipesService, AuthService
  ]
})
export class AppModule {}
