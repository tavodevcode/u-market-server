import { CreatePackageBenefitInput } from './create-package-benefit.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePackageBenefitInput extends PartialType(CreatePackageBenefitInput) {
  @Field(() => Int)
  id: number;
}
