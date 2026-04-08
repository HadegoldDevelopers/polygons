import 'dotenv/config'; // loads .env file
import { createClient } from '@supabase/supabase-js';

// ---------------------
// 1️⃣ Supabase client
// ---------------------
const supabaseService = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,  // e.g., http://127.0.0.1:54321
  process.env.SUPABASE_SERVICE_ROLE_KEY // your local service role key
);

// ---------------------
// 2️⃣ Test webhook call
// ---------------------
async function testWebhook() {
  try {
    // Use a unique test session ID
    const sessionId = `local-test-${Date.now()}`;
    const testUserId = 'your-test-user-uuid'; // create a test user in your local DB

    // 2️⃣ Create a deposit session locally
    const { data: session, error: insertError } = await supabaseService
      .from('deposit_sessions')
      .insert([
        {
          id: sessionId,
          user_id: testUserId,
          coin: 'BTC',
          amount: 0.01,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (insertError) throw insertError;

    console.log('✅ Created test deposit session:', session);

    // 3️⃣ Call your webhook code directly
    const { POST } = await import('./pages/api/deposit-webhook.js'); // adjust path if needed
    const req = new Request('http://localhost:3000/api/deposit-webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-nowpayments-sig': 'test-secret', // local testing
      },
      body: JSON.stringify({
        payment_status: 'finished',
        payment_id: sessionId,
        pay_amount: 0.01,
      }),
    });

    const res = await POST(req);
    const json = await res.json();
    console.log('✅ Webhook response:', json);

    // 4️⃣ Check wallet
    const { data: wallet } = await supabaseService
      .from('wallets')
      .select('*')
      .eq('user_id', testUserId)
      .eq('symbol', 'BTC')
      .single();

    console.log('💰 Wallet after deposit:', wallet);

    // 5️⃣ Check transaction
    const { data: transaction } = await supabaseService
      .from('transactions')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    console.log('📄 Transaction logged:', transaction);

  } catch (err) {
    console.error('❌ Test failed:', err);
  }
}

testWebhook();