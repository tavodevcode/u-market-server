import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './entities/user.entity'

import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async users(): Promise<User[]> {
    return await this.usersRepository.find()
  }

  async userById(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ id })
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.usersRepository.create(createUserInput)
    return await this.usersRepository.save(user)
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id })
    this.usersRepository.merge(user, updateUserInput)
    return await this.usersRepository.save(user)
  }

  async remove(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id })
    return await this.usersRepository.remove(user)
  }
}
