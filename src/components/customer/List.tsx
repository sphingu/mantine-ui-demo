import { CustomDrawerWithTarget } from '../common/CustomDrawer'
import { CreateOrUpdate } from './CreateOrUpdate'
import { Details } from './Details'

export const List = () => {
  return (
    <section>
      <header>Customer List</header>
      <div>
        <CustomDrawerWithTarget buttonText="Add Customer" title="Add Customer">
          <CreateOrUpdate />
        </CustomDrawerWithTarget>

        <CustomDrawerWithTarget
          buttonText="Edit Customer"
          title="Edit Customer"
        >
          <CreateOrUpdate id="test-1" />
        </CustomDrawerWithTarget>

        <CustomDrawerWithTarget buttonText="Details" title="Customer Details">
          <Details />
        </CustomDrawerWithTarget>
      </div>
    </section>
  )
}
