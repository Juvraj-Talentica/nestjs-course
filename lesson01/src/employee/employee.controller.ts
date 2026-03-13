import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Prisma } from 'generated/prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle() // Skip throttling for all routes in this controller
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  private readonly logger = new MyLoggerService(EmployeeController.name);

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeeService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false }) // Enable throttling for this route only
  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: 'ADMIN' | 'EMPLOYEE' | 'MANAGER' | 'INTERN') {
    this.logger.log(`Request for all Employees\t${Ip}`);
    return this.employeeService.findAll(role);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } }) // Apply short throttle for this route
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
