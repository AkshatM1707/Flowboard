"use client" ;

import { OrganizationSwitcher, UserButton , useOrganization } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";

export const Navbar = () => {
    const {organization} = useOrganization() ;
console.log(useUser());
    return (
        <div className="flex items-center gap-x-4 p-5" >
            <div className="hidden lg:flex lg:flex-1 ">
                <SearchInput/>
            </div>
            <div className="block lg:hidden flex-1">
            <OrganizationSwitcher 
            hidePersonal
            appearance={{
                elements: {
                    rootBox:{
                        display:"flex",
                        justifyConetent:"center",
                        alignItems:"center",
                        width:"100%",
                        maxWidth:"370px",
                    },
                    organizationSwitcherTrigger:{
                        padding:"6px",
                        width:"100%",
                        borderRadius:"8px",
                        border:"1px solid #E5E5E5",
                        justifyContent:"space-between",
                        backgroundColor:"white",
                    }            
            }}}
            />
            </div>
            {organization && (
                 <InviteButton/>
            ) }
           
            
            <UserButton/>
        </div>
        
    ); 
};