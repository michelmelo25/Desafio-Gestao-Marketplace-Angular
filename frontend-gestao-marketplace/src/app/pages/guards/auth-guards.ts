import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../../services/user";
import { UserAuthService } from "../../services/user-auth";
import { firstValueFrom } from "rxjs";

export const authGuard: CanActivateFn = async (route, state) => {
    const _userService = inject(UserService);
    const _userAuthService = inject(UserAuthService);
    const _router = inject(Router);

    const HAS_TOKEN = _userAuthService.getUserToken();
    //Não possui token no localstorage
    if(!HAS_TOKEN){
        return _router.navigate(['/login']);
    }

    try {
        // Tenta validar o token no backend
        await firstValueFrom(_userService.validateUser());

        // Se o usuario está validado e tenta acessar a rota de login
        // ele é redirecionado para a página de produtos
        if(state.url === '/login'){
            return _router.navigate(['/products'])
        }

        // Se o token é valido e a rota não é de logi, permite o acesso para a rota desejada.
        return true;
    } catch (error) {

        // Se a requisição de validação falhar, redireciona para o login
        return _router.navigate(['/login']);
    }
}