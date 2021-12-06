import { Construct, Stack, StackProps, CfnOutput }  from '@aws-cdk/core';
import { Group, Policy, PolicyStatement, User, CfnAccessKey, ManagedPolicy } from '@aws-cdk/aws-iam';


const groupName = 'AdminGroup';
const adminUsers = ['AdminUser01', 'AdminUser02', 'AdminUser03'];

export class IamStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    // AWS managed policy
    const adminPolicy = ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess');

    // グループの定義
    const adminGroup = new Group(this, groupName, { groupName });
    adminGroup.addManagedPolicy(adminPolicy);
    
    // Create users
    adminUsers.forEach(adminUser => {
      new User(this, adminUser, {
        userName: adminUser,
        groups: [adminGroup],
      });
    });
  }
}