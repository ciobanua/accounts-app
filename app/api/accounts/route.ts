
const accounts = [
    {
      "id": 1,
      "ownerId": 1234535,
      "currency": "EUR",
      "balance": 50000,
      "status": "enabled"
    },
    {
      "id": 2,
      "ownerId": 1234535,
      "currency": "USD",
      "balance": 1000,
       "status": "enabled"
    },
    {
      "id": 3,
      "ownerId": 304857,
      "currency": "EUR",
      "balance": 549.16,
       "status": "disabled"
    },
    {
      "id": 4,
      "ownerId": 4456645,
      "currency": "RON",
      "balance": 7500,
       "status": "enabled"
    },
    {
      "id": 5,
      "ownerId": 4456645,
      "currency": "CAD",
      "balance": 390.25,
       "status": "disabled"
    },
    {
      "id": 6,
      "ownerId": 63434346,
      "currency": "DKK",
      "balance": 100.10,
       "status": "enabled"
    },
      {
      "id": 7,
      "ownerId": 1236654,
      "currency": "EUR",
      "balance": 799.25,
       "status": "enabled"
    },
    {
      "id": 8,
      "ownerId": 23896543,
      "currency": "DKK",
      "balance": 10000.50,
       "status": "disabled"
    }
  ]

export async function GET() {
  return new Response(JSON.stringify(accounts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST() {
  return new Response(JSON.stringify({message: 'accounts.add_success'}), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

