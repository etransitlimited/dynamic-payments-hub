
import deposit from './wallet/deposit';
import withdraw from './wallet/withdraw';
import transactions from './wallet/transactions';
import depositRecords from './wallet/depositRecords';
import fundDetails from './wallet/fundDetails';
import financialTracking from './wallet/financialTracking';
import periods from './wallet/periods';
import days from './wallet/days';
import general from './wallet/general';

const wallet = {
  "wallet": {
    ...deposit,
    ...withdraw,
    ...transactions,
    ...depositRecords,
    ...fundDetails,
    ...financialTracking,
    ...periods,
    ...days,
    ...general
  }
};

export default wallet;
