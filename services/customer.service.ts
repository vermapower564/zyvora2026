import { User, Address } from '../types/user';

export class CustomerService {
  private static addresses: Address[] = [
    {
      id: 'addr_1',
      userId: 'usr_demo_customer_1',
      fullName: 'Alex Mercer',
      street: '742 Evergreen Terrace',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States',
      phone: '+1 (555) 234-5678',
      isDefault: true,
    },
    {
      id: 'addr_2',
      userId: 'usr_demo_customer_1',
      fullName: 'Alex Mercer (Office)',
      street: '100 Market St Suite 400',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'United States',
      phone: '+1 (555) 987-6543',
      isDefault: false,
    },
  ];

  public static async getAddresses(userId: string): Promise<Address[]> {
    return this.addresses.filter((a) => a.userId === userId);
  }

  public static async addAddress(address: Omit<Address, 'id'>): Promise<Address> {
    const newAddr: Address = {
      ...address,
      id: `addr_${Date.now()}`,
    };
    if (newAddr.isDefault) {
      this.addresses = this.addresses.map((a) => ({ ...a, isDefault: false }));
    }
    this.addresses.push(newAddr);
    return newAddr;
  }

  public static async deleteAddress(id: string): Promise<boolean> {
    this.addresses = this.addresses.filter((a) => a.id !== id);
    return true;
  }
}
