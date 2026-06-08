'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { consultationSchema, type ConsultationData } from '@/lib/validations';
import { submitConsultation } from '@/actions/consultation';
import { IconSend } from '@/components/shared/icons';
import { cn } from '@/lib/utils';

export default function ConsultationForm() {
  const t  = useTranslations('Consultation');
  const tf = useTranslations('Forms');
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const { register, handleSubmit, formState: { errors } } = useForm<ConsultationData>({
    resolver: zodResolver(consultationSchema),
  });

  function onSubmit(data: ConsultationData) {
    startTransition(async () => {
      const res = await submitConsultation(data);
      if (res.success) {
        setStatus('success');
      } else {
        setErrorMsg(res.error ?? '');
        setStatus('error');
      }
    });
  }

  if (status === 'success') {
    return (
      <div className="card p-8 flex flex-col items-center justify-center gap-4 text-center min-h-[400px]">
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
          <label className="form-label">{t('emailField')}</label>
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
        <label className="form-label">{t('description')}</label>
        <textarea
          {...register('description')}
          rows={4}
          className={cn('form-input resize-none', errors.description && 'border-red-500/60')}
          placeholder={t('descPlaceholder')}
        />
        {errors.description && <p className="text-red-400 text-xs mt-1">{tf('required')}</p>}
      </div>

      <div>
        <label className="form-label">{t('availability')}</label>
        <input {...register('availability')} className="form-input" placeholder={t('availPlaceholder')} />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {t('error')}{errorMsg ? ` — ${errorMsg}` : ''}
        </p>
      )}

      <button type="submit" disabled={isPending} className="btn btn-green-dark justify-center mt-1 w-full py-3.5 disabled:opacity-60">
        {isPending ? tf('sending') : (
          <>
            <IconSend className="w-4 h-4" />
            {t('submit')}
          </>
        )}
      </button>
      <p className="text-[11px] text-content-subtle text-center">{t('disclaimer')}</p>
    </form>
  );
}
