import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

@Injectable()

export class jwtAuthGuard extends AuthGuard('jwt'){

}