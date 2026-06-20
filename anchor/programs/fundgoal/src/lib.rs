use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("11111111111111111111111111111111");

#[program]
pub mod fundgoal {
    use super::*;

    pub fn initialize_match(
        ctx: Context<InitializeMatch>,
        match_id: String,
        charity_wallet: Pubkey,
    ) -> Result<()> {
        let pool = &mut ctx.accounts.match_pool;
        pool.match_id = match_id;
        pool.admin = ctx.accounts.admin.key();
        pool.charity_wallet = charity_wallet;
        pool.team_a_total = 0;
        pool.team_b_total = 0;
        pool.is_open = true;
        pool.bump = ctx.bumps.match_pool;
        Ok(())
    }

    pub fn deposit(
        ctx: Context<Deposit>,
        match_id: String,
        team_choice: u8, // 0 = Team A, 1 = Team B
        amount: u64,
    ) -> Result<()> {
        require!(ctx.accounts.match_pool.is_open, FundGoalError::PoolClosed);
        require!(team_choice == 0 || team_choice == 1, FundGoalError::InvalidTeam);
        require!(amount > 0, FundGoalError::InvalidAmount);

        // Transfer SOL from giver to pool PDA
        let cpi_ctx = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.giver.to_account_info(),
                to: ctx.accounts.match_pool.to_account_info(),
            },
        );
        system_program::transfer(cpi_ctx, amount)?;

        // Record stake
        let stake = &mut ctx.accounts.stake;
        stake.giver = ctx.accounts.giver.key();
        stake.match_id = match_id;
        stake.team_choice = team_choice;
        stake.amount = amount;
        stake.bump = ctx.bumps.stake;

        // Update pool totals
        let pool = &mut ctx.accounts.match_pool;
        if team_choice == 0 {
            pool.team_a_total = pool.team_a_total.checked_add(amount).unwrap();
        } else {
            pool.team_b_total = pool.team_b_total.checked_add(amount).unwrap();
        }

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(match_id: String)]
pub struct InitializeMatch<'info> {
    #[account(
        init,
        payer = admin,
        space = 8 + MatchPool::INIT_SPACE,
        seeds = [b"match_pool", match_id.as_bytes()],
        bump
    )]
    pub match_pool: Account<'info, MatchPool>,

    #[account(mut)]
    pub admin: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(match_id: String, team_choice: u8, amount: u64)]
pub struct Deposit<'info> {
    #[account(
        mut,
        seeds = [b"match_pool", match_id.as_bytes()],
        bump = match_pool.bump,
    )]
    pub match_pool: Account<'info, MatchPool>,

    #[account(
        init,
        payer = giver,
        space = 8 + Stake::INIT_SPACE,
        seeds = [b"stake", match_id.as_bytes(), giver.key().as_ref()],
        bump
    )]
    pub stake: Account<'info, Stake>,

    #[account(mut)]
    pub giver: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct MatchPool {
    #[max_len(20)]
    pub match_id: String,
    pub admin: Pubkey,
    pub charity_wallet: Pubkey,
    pub team_a_total: u64,
    pub team_b_total: u64,
    pub is_open: bool,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct Stake {
    pub giver: Pubkey,
    #[max_len(20)]
    pub match_id: String,
    pub team_choice: u8,
    pub amount: u64,
    pub bump: u8,
}

#[error_code]
pub enum FundGoalError {
    #[msg("Pool is closed")]
    PoolClosed,
    #[msg("Invalid team choice — must be 0 or 1")]
    InvalidTeam,
    #[msg("Amount must be greater than 0")]
    InvalidAmount,
}
