'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">teacher-router documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AngularMaterialModule.html" data-type="entity-link" >AngularMaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-7101aa23421351efc0d0f3c617befd70d11f609f04981b1ecfb7b609273592a1744060e819f005e24d5f1842e5f8501ea45b17757eb28ae3e1cfba27a2a4d439"' : 'data-target="#xs-components-links-module-AppModule-7101aa23421351efc0d0f3c617befd70d11f609f04981b1ecfb7b609273592a1744060e819f005e24d5f1842e5f8501ea45b17757eb28ae3e1cfba27a2a4d439"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-7101aa23421351efc0d0f3c617befd70d11f609f04981b1ecfb7b609273592a1744060e819f005e24d5f1842e5f8501ea45b17757eb28ae3e1cfba27a2a4d439"' :
                                            'id="xs-components-links-module-AppModule-7101aa23421351efc0d0f3c617befd70d11f609f04981b1ecfb7b609273592a1744060e819f005e24d5f1842e5f8501ea45b17757eb28ae3e1cfba27a2a4d439"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-23cc8f9e000fee9f9e7f1015ab1da5c0d683e35aef0811de951411b7ffd0ede19767656c93765ceb0773feedb4fbd2d755f332ba2a8240d192155433047e2913"' : 'data-target="#xs-components-links-module-AuthModule-23cc8f9e000fee9f9e7f1015ab1da5c0d683e35aef0811de951411b7ffd0ede19767656c93765ceb0773feedb4fbd2d755f332ba2a8240d192155433047e2913"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-23cc8f9e000fee9f9e7f1015ab1da5c0d683e35aef0811de951411b7ffd0ede19767656c93765ceb0773feedb4fbd2d755f332ba2a8240d192155433047e2913"' :
                                            'id="xs-components-links-module-AuthModule-23cc8f9e000fee9f9e7f1015ab1da5c0d683e35aef0811de951411b7ffd0ede19767656c93765ceb0773feedb4fbd2d755f332ba2a8240d192155433047e2913"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TeacherRouterModule.html" data-type="entity-link" >TeacherRouterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TeacherRouterModule-263b3b6f9337504142e9808dc9e8322b2e9134221c1b3feab74bc58c2ef0b12fc0b2b017e81fa7dcda5741d6ff9b6d68bcaba14c115e70f50af11670377c46ab"' : 'data-target="#xs-components-links-module-TeacherRouterModule-263b3b6f9337504142e9808dc9e8322b2e9134221c1b3feab74bc58c2ef0b12fc0b2b017e81fa7dcda5741d6ff9b6d68bcaba14c115e70f50af11670377c46ab"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TeacherRouterModule-263b3b6f9337504142e9808dc9e8322b2e9134221c1b3feab74bc58c2ef0b12fc0b2b017e81fa7dcda5741d6ff9b6d68bcaba14c115e70f50af11670377c46ab"' :
                                            'id="xs-components-links-module-TeacherRouterModule-263b3b6f9337504142e9808dc9e8322b2e9134221c1b3feab74bc58c2ef0b12fc0b2b017e81fa7dcda5741d6ff9b6d68bcaba14c115e70f50af11670377c46ab"' }>
                                            <li class="link">
                                                <a href="components/AdminHomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminSidenavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminSidenavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CenterLabelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CenterLabelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CenterManagerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CenterManagerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ItemsManagerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemsManagerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RouteManagerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RouteManagerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeacherHomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeacherHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserManagerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserManagerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VisitorSidenavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VisitorSidenavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeacherRouterRoutingModule.html" data-type="entity-link" >TeacherRouterRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SidenavService.html" data-type="entity-link" >SidenavService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeacherRouterService.html" data-type="entity-link" >TeacherRouterService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Teacher.html" data-type="entity-link" >Teacher</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});