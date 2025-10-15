import{a as e}from"./rolldown-runtime-Cn8xt2Gj.js";import{a as t}from"./forms-pj7poXQ7.js";import{i as n}from"./framer-motion-BnyUh_w0.js";var r=e(t()),i=e(n());const a=(0,r.forwardRef)(({label:e,error:t,helperText:n,className:r=``,id:a,...o},s)=>{let c=a||`input-${e?.replace(/\s/g,`-`).toLowerCase()}`,l=`${c}-error`,u=`${c}-helper`;return(0,i.jsxs)(`div`,{className:`flex w-full flex-col gap-1`,children:[e&&(0,i.jsx)(`label`,{htmlFor:c,className:`text-sm sm:text-base font-medium text-[#292929]`,children:e}),(0,i.jsx)(`input`,{ref:s,id:c,className:`
            w-full
            rounded-[10px]
            border
            bg-[#FAFAFA]
            px-3 py-2.5
            sm:py-3
            md:py-3.5
            text-start
            text-xs
            sm:text-sm
            md:text-base
            text-[#838383]
            shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)]
            transition-all
            duration-200
            placeholder:text-[#838383]
            focus:outline-none
            focus:ring-2
            focus:ring-[#292929]
            focus:ring-offset-0
            disabled:cursor-not-allowed
            disabled:opacity-50
            ${t?`border-2 border-[#FF233D] focus:ring-[#FF233D]`:`border border-[#292929]`}
            ${r}
          `,style:{fontFamily:`'Gotham Rounded', sans-serif`,fontWeight:325,lineHeight:`140%`},"aria-invalid":t?`true`:`false`,"aria-describedby":t?l:n?u:void 0,...o}),t&&(0,i.jsx)(`p`,{id:l,role:`alert`,className:`text-[11px] sm:text-sm leading-[140%] text-[#FF233D]`,style:{fontFamily:`'Gotham Rounded', sans-serif`,fontWeight:400},children:t}),n&&!t&&(0,i.jsx)(`p`,{id:u,className:`text-[11px] sm:text-sm text-[#838383]`,style:{fontFamily:`'Gotham Rounded', sans-serif`,fontWeight:400},children:n})]})});a.displayName=`Input`;export{a as t};