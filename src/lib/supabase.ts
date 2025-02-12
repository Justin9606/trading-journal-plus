// Mock auth functions for UI development
export const supabase = {
  auth: {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock validation
      if (!email || !password) {
        return { error: { message: 'Email and password are required' } };
      }
      
      // Mock successful login
      return {
        data: {
          user: { id: '1', email },
          session: { access_token: 'mock_token' }
        },
        error: null
      };
    },

    signUp: async ({ email, password }: { email: string; password: string }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock validation
      if (!email || !password) {
        return { error: { message: 'Email and password are required' } };
      }
      
      // Mock successful registration
      return {
        data: {
          user: { id: '1', email },
          session: { access_token: 'mock_token' }
        },
        error: null
      };
    },

    signInWithOAuth: async ({ provider }: { provider: string }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock OAuth flow
      return { error: null };
    }
  }
};