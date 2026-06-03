'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { masterclassSchema, type MasterclassData } from '@/lib/validations';
import { submitMasterclass } from '@/actions/masterclass';
import { cn } from '@/lib/utils';

export default function MasterclassForm() {
  const t  = useTranslations('Masterclass');
  const tf = useTranslations('Forms');
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors }, watch } = useForm<MasterclassData>({
    resolver: zodResolver(masterclassSchema),
    defaultValues: { option: 'complet' },
  });

  const selectedOption = watch('option');

  function onSubmit(data: MasterclassData) {
    startTransition(async () => {
      const res = await submitMasterclass(data);
      setStatus(res.success ? 'success' : 'error');
    });
  }

  if (status === 'success') {
    return (
      <div className="card p-8 flex flex-col items-center justify-center gap-4 text-center min-h-[340px]">
        <div className="w-14 h-14 rounded-full bg-[var(--em-subtle)] border border-[var(--border-em)] flex items-center justify-center text-2xl">✓</div>
        <p className="text-content font-semibold text-lg">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card p-6 md:p-8 flex flex-col gap-4">
      <h3 className="font-heading text-base font-bold text-content flex items-center gap-2 mb-1">
        <span className="w-1 h-5 rounded-full bg-em flex-shrink-0" />
        {t('formTitle')}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">{t('nom')}</label>
          <input {...register('nom')} className={cn('form-input', errors.nom && 'border-red-500/60')} placeholder={tf('nomPlaceholder')} />
          {errors.nom && <p className="text-red-400 text-xs mt-1">{tf('required')}</p>}
        </div>
        <div>
          <label className="form-label">{t('prenom')}</label>
          <input {...register('prenom')} className={cn('form-input', errors.prenom && 'border-red-500/60')} placeholder={tf('prenomPlaceholder')} />
          {errors.prenom && <p className="text-red-400 text-xs mt-1">{tf('required')}</p>}
        </div>
        <div>
          <label className="form-label">{t('email')}</label>
          <input {...register('email')} type="email" className={cn('form-input', errors.email && 'border-red-500/60')} placeholder={tf('emailPlaceholder')} />
          {errors.email && <p className="text-red-400 text-xs mt-1">{tf('invalidEmail')}</p>}
        </div>
        <div>
          <label className="form-label">{t('telephone')}</label>
          <input {...register('telephone')} type="tel" className={cn('form-input', errors.telephone && 'border-red-500/60')} placeholder={tf('phonePlaceholder')} />
          {errors.telephone && <p className="text-red-400 text-xs mt-1">{tf('invalidPhone')}</p>}
        </div>
      </div>

      <div>
        <label className="form-label">{t('option')}</label>
        <div className="flex flex-col gap-2.5 mt-1">
          {(['epargne', 'assurance', 'complet'] as const).map((val) => (
            <label
              key={val}
              className={cn(
                'flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-150',
                selectedOption === val
                  ? 'border-[var(--border-em)] bg-[var(--em-subtle)]'
                  : 'border-[var(--border)] hover:border-[var(--border-em)] hover:bg-[var(--em-subtle)]/50',
              )}
            >
              <input type="radio" value={val} {...register('option')} className="mt-0.5 w-4 h-4 accent-em flex-shrink-0" />
              <div className="text-sm">
                <strong className={cn('block text-[13px] font-semibold mb-0.5', selectedOption === val ? 'text-em-light' : 'text-content')}>
                  {t(`opt${val === 'epargne' ? '1' : val === 'assurance' ? '2' : '3'}title`)}
                </strong>
                <span className="text-content-muted">
                  {t(`opt${val === 'epargne' ? '1' : val === 'assurance' ? '2' : '3'}desc`)}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{t('error')}</p>
      )}

      <button type="submit" disabled={isPending} className="btn btn-primary justify-center mt-1 w-full py-3.5 disabled:opacity-60">
        {isPending ? tf('sending') : t('submit')}
        {!isPending && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>
      <p className="text-[11px] text-content-subtle text-center">{t('disclaimer')}</p>
    </form>
  );
}
