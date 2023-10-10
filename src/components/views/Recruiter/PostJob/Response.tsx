import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { IFormInputsPostAJob } from '../../../../interface/employer';
import user from '../../../../assets/png/user.png';
import envelop from '../../../../assets/svg/envelop.svg';
import close from '../../../../assets/svg/close.svg';
import user_icon from '../../../../assets/svg/user_icon.svg';

const Response = () => {

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IFormInputsPostAJob>({
    //  resolver: yupResolver(PostJobSchema),
  });

  return (
    <>
      <div className="w-full h-auto flex-col justify-start items-start gap-10 inline-flex">
        <div className="self-stretch  flex-col justify-start items-start gap-10 flex">
          <div className="justify-start items-end gap-2 inline-flex">
            <div className="text-black text-xl font-medium  leading-normal tracking-tight">Response</div>
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-7 flex">
            <div className="self-stretch h-[129px] flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch h-[73px] flex-col justify-start items-start gap-2 flex">
                <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Who can manage the responses?</div>

                <div className="self-stretch h-12 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-2 inline-flex">
                  <div className="grow shrink basis-0 self-stretch pr-6 justify-start items-center gap-2 flex">
                    <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                      <img className="w-6 h-6 rounded-[40px]" src={user} />
                      <div className="grow shrink basis-0 text-black text-base font-normal  leading-snug tracking-tight">Swapnil Bansal</div>
                    </div>
                    <div className="w-[0px] self-stretch justify-start items-center gap-3 flex">
                      <div className="w-7 h-[0px] origin-top-left rotate-90 border border-slate-200"></div>
                    </div>
                    <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                      <div className="w-6 h-6 justify-center items-center flex"><img src={envelop} alt='envalop' /></div>
                      <div className="grow shrink basis-0 text-black text-base font-normal  leading-snug tracking-tight">swapnil.bansal@ratnaglobaltech.com</div>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-slate-100 rounded justify-center items-center flex">
                    <img src={close} alt='close' />
                  </div>
                </div>
              </div>

              <div className="self-stretch h-12 flex-col justify-start items-start gap-2 flex">
                <div className="self-stretch h-12 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-2 inline-flex">
                  <div className="grow shrink basis-0 self-stretch pr-12 justify-start items-center gap-2 flex">
                    <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                      <div className="w-6 h-6 flex-col justify-center items-center inline-flex">
                        <img src={user_icon} alt='user_icon' />
                      </div>
                      <div className="grow shrink basis-0 text-slate-400 text-base font-normal  leading-snug tracking-tight">Employee name</div>
                    </div>
                    <div className="grow shrink basis-0 h-6 justify-start items-center gap-2 flex">
                      <div className="w-6 h-6 justify-center items-center flex"><img src={envelop} alt='envalop' /></div>
                      <div className="grow shrink basis-0 text-slate-400 text-base font-normal  leading-snug tracking-tight">example@gmail.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex-col justify-start items-start gap-2 flex">
              <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">How often do you want to receive updates on email?</div>
              <div className="self-stretch justify-start items-start gap-5 inline-flex">
                <div className="grow shrink basis-0 h-12 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-3 flex">
                  <div className="w-6 h-6 justify-center items-center flex">
                    <input type="checkbox"
                      {...register("fillCompanyInformation")}
                      defaultChecked={true}
                      className=" w-4 h-4" /></div>
                  <div className="flex-col justify-start items-start gap-1 inline-flex">
                    <div className="text-black text-base font-normal  leading-snug tracking-tight">Daily</div>
                  </div>
                </div>
                <div className="grow shrink basis-0 h-12 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-3 flex">
                  <div className="w-6 h-6 justify-center items-center flex">
                    <input type="checkbox"
                      {...register("fillCompanyInformation")}
                      defaultChecked={true}
                      className=" w-4 h-4" />
                  </div>
                  <div className="flex-col justify-start items-start gap-1 inline-flex">
                    <div className="text-black text-base font-normal  leading-snug tracking-tight">Every week</div>
                  </div>
                </div>
                <div className="grow shrink basis-0 h-12 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-3 flex">
                  <div className="w-6 h-6 justify-center items-center flex">
                    <input type="checkbox"
                      {...register("fillCompanyInformation")}
                      defaultChecked={true}
                      className=" w-4 h-4" />
                  </div>
                  <div className="flex-col justify-start items-start gap-1 inline-flex">
                    <div className="text-black text-base font-normal  leading-snug tracking-tight">Every month</div>
                  </div>
                </div>
                <div className="grow shrink basis-0 h-12 p-3 bg-white rounded-lg border border-slate-200 justify-start items-center gap-3 flex">
                  <div className="w-6 h-6 justify-center items-center flex">
                    <input type="checkbox"
                      {...register("fillCompanyInformation")}
                      defaultChecked={true}
                      className=" w-4 h-4" />
                  </div>
                  <div className="flex-col justify-start items-start gap-1 inline-flex">
                    <div className="text-black text-base font-normal  leading-snug tracking-tight">Every Hour</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-5 inline-flex">
          <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex">
            <div className="w-6 h-6 justify-center items-center flex"></div>
            <div className="text-indigo-900 text-xl font-medium  leading-normal tracking-tight">Back</div>
          </div>
          <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex">
            <div className="text-white text-xl font-medium  leading-normal tracking-tight">Finish</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Response