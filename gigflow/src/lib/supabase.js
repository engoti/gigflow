import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gmavheiofhacxwpqrrgs.supabase.co';      // ← CHANGE THIS
const supabaseAnonKey = 'sb_publishable_2R6673yGFSbksKAl5vOGyA_XooLMJpo';                 // ← CHANGE THIS

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updatePaidStatus = async (userId, paid, plan = 'pro', paymentId = null) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ 
      has_paid: paid, 
      plan,
      payment_id: paymentId,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};