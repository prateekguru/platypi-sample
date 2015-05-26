﻿/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

import BaseViewControl = require('../base/base.viewcontrol');
import UserRepository = require('../../repositories/user/user.repository');
import HomeViewControl = require('../home/home.viewcontrol');

class RegisterViewControl extends BaseViewControl {
    /**
     * This is the property that indicates where the template HTML for this control exists.
     */
    templateString: string = require('./register.viewcontrol.html');

    /**
     * The context variable on a control corresponds to what can be used 
     * for data binding in the view.
     */
    context: any = {
         firstname: '',
         lastname: '',
         email: '',
         password: '',
         error: '' 
    };

    /**
     * This is the initialize event method for a control. In this method a control 
     * should initialize all the necessary variables. This method is typically only 
     * necessary for view controls. If a control does not implement plat.ui.IViewControl 
     * then it is not safe to access, observe, or modify the context property in this 
     * method. A view control should call services/set context in this method in order 
     * to fire the loaded event. No control will be loaded until the view control has 
     * specified a context.
     */
    initialize(): void { }

    /**
     * This event is fired after all of the child controls of this control have loaded.
     * Since this is a view control, setting its context kicks off the binding and loading 
     * phases.
     */
    loaded(): any { }

    /**
     * This event is fired when a navigation state has been matched for this control. 
     * In this method you can return a boolean or Promise of a boolean indicating whether 
     * or not it is possible to navigate to this control in the current context of the app.
     * You must explicitly return false or a Promise of false to prevent navigation.
     */
    canNavigateTo(parameters: any, query: any): any { }

    /**
     * This event is fired when a navigation state has been matched that is outside the context
     * for this control. In this method you can return a boolean or Promise of a boolean 
     * indicating whether or not it is possible to navigate from this control in the current 
     * context of the app. This can be useful for prompting the user to save state before navigating. 
     * You must explicitly return false or a Promise of false to prevent navigation.
     */
    canNavigateFrom(): any { }

    /**
     * This event is fired when this control is navigated to directly using the 
     * navigator.navigate method on a view control. The parameter corresponds to 
     * an object sent from the previous view control during navigation.
     */
    navigatedTo(parameters: any, query: any): void { }

    /**
     * This event is fired when you are navigating away from this view control to another 
     * view control.
     */
    navigatingFrom(): any { }

    /**
     * The dispose event is called when a control is being removed from memory. A control 
     * should release all of the memory it is using, including DOM event and property 
     * listeners.
     */
    dispose(): void { }
    
    
    constructor(private userRepository: UserRepository) {
          super();
    }
    
    
    register() {
         this.context.error = '';
         this.userRepository.register(this.context.email,
             this.context.password,
             this.context.firstname,
             this.context.lastname)
         .then((success) => {
             this.navigator.navigate(HomeViewControl);
         }).catch((error) => {
             this.context.error = error;
         });
     }
}

plat.register.viewControl('register-vc', RegisterViewControl, [UserRepository]);

export = RegisterViewControl;
