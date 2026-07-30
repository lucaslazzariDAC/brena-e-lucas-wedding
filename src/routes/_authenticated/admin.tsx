import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LogOut, Download, Search, Trash2, Edit2, Check, X } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Painel · Lucas & Brena" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Rsvp = {
  id: string;
  full_name: string;
  phone: string;
  guests_count: number;
  companions: string | null;
  message: string | null;
  created_at: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<Rsvp>>({});

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        navigate({ to: "/auth" });
        return;
      }
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!roleRow);
      if (roleRow) await loadRsvps();
      setLoading(false);
    })();
  }, [navigate]);

  const loadRsvps = async () => {
    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Erro ao carregar", { description: error.message });
      return;
    }
    setRsvps((data as Rsvp[]) ?? []);
  };

  // acesso de admin é concedido automaticamente por trigger no banco para emails autorizados


  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const deleteRsvp = async (id: string) => {
    if (!confirm("Excluir esta confirmação?")) return;
    const { error } = await supabase.from("rsvps").delete().eq("id", id);
    if (error) return toast.error("Erro", { description: error.message });
    setRsvps((r) => r.filter((x) => x.id !== id));
    toast.success("Excluído");
  };

  const startEdit = (r: Rsvp) => {
    setEditingId(r.id);
    setEditDraft({
      full_name: r.full_name,
      phone: r.phone,
      guests_count: r.guests_count,
      companions: r.companions,
      message: r.message,
    });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const { error } = await supabase
      .from("rsvps")
      .update(editDraft)
      .eq("id", editingId);
    if (error) return toast.error("Erro", { description: error.message });
    setRsvps((rs) =>
      rs.map((r) => (r.id === editingId ? { ...r, ...editDraft } as Rsvp : r)),
    );
    setEditingId(null);
    toast.success("Atualizado");
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rsvps;
    return rsvps.filter(
      (r) =>
        r.full_name.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        (r.companions ?? "").toLowerCase().includes(q),
    );
  }, [rsvps, search]);

  const totals = useMemo(() => {
    const confirmations = rsvps.length;
    const people = rsvps.reduce((sum, r) => sum + (r.guests_count || 0), 0);
    return { confirmations, people };
  }, [rsvps]);

  const exportCsv = () => {
    const header = ["Nome completo", "Telefone", "Convidados", "Acompanhantes", "Mensagem", "Data"];
    const rows = filtered.map((r) => [
      r.full_name,
      r.phone,
      String(r.guests_count),
      r.companions ?? "",
      r.message ?? "",
      new Date(r.created_at).toLocaleString("pt-BR"),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `confirmados-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-navy-texture px-6 py-20 text-paper">
        <p className="text-center text-silver">Carregando...</p>
      </main>
    );
  }

  if (isAdmin === false) {
    return (
      <main className="min-h-screen bg-navy-texture px-6 py-20 text-paper">
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-display text-2xl tracking-[0.2em]">SEM ACESSO</h1>
          <p className="mt-4 text-sm text-silver">
            Esta conta não tem permissão de admin. Apenas os emails autorizados dos noivos podem acessar este painel.
          </p>
          <button
            onClick={signOut}
            className="mt-6 inline-flex items-center gap-2 rounded-sm border border-silver bg-silver/10 px-6 py-3 text-xs uppercase tracking-[0.3em] hover:bg-silver/20"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-navy-texture px-4 py-10 text-paper sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-xl tracking-[0.2em] sm:text-2xl">
              PAINEL · CONFIRMAÇÕES
            </h1>
            <p className="mt-1 text-xs text-silver">Lucas & Brena · 29.03.2027</p>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-sm border border-silver/40 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:bg-silver/10"
          >
            <LogOut className="h-3.5 w-3.5" /> Sair
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label="Confirmações" value={totals.confirmations} />
          <Stat label="Total de pessoas" value={totals.people} />
          <Stat label="Média / grupo" value={totals.confirmations ? (totals.people / totals.confirmations).toFixed(1) : "0"} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-silver" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, telefone, acompanhante..."
              className="w-full rounded-sm border border-silver/30 bg-navy/40 py-2.5 pl-10 pr-4 text-sm text-paper outline-none placeholder:text-silver/50 focus:border-ocean"
            />
          </div>
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 rounded-sm border border-silver bg-silver/10 px-4 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-silver/20"
          >
            <Download className="h-3.5 w-3.5" /> Exportar CSV
          </button>
        </div>

        <div className="mt-6 overflow-x-auto rounded-sm border border-silver/20">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-navy/60 text-xs uppercase tracking-wider text-silver">
              <tr>
                <th className="p-3">Nome</th>
                <th className="p-3">Telefone</th>
                <th className="p-3">Conv.</th>
                <th className="p-3">Acompanhantes</th>
                <th className="p-3">Mensagem</th>
                <th className="p-3">Data</th>
                <th className="p-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-silver">
                    Nenhuma confirmação ainda.
                  </td>
                </tr>
              )}
              {filtered.map((r) => {
                const editing = editingId === r.id;
                return (
                  <tr key={r.id} className="border-t border-silver/10 align-top">
                    <td className="p-3">
                      {editing ? (
                        <input
                          value={editDraft.full_name ?? ""}
                          onChange={(e) => setEditDraft((d) => ({ ...d, full_name: e.target.value }))}
                          className="w-full rounded border border-silver/30 bg-navy/60 px-2 py-1"
                        />
                      ) : (
                        r.full_name
                      )}
                    </td>
                    <td className="p-3">
                      {editing ? (
                        <input
                          value={editDraft.phone ?? ""}
                          onChange={(e) => setEditDraft((d) => ({ ...d, phone: e.target.value }))}
                          className="w-full rounded border border-silver/30 bg-navy/60 px-2 py-1"
                        />
                      ) : (
                        r.phone
                      )}
                    </td>
                    <td className="p-3">
                      {editing ? (
                        <input
                          type="number"
                          min={1}
                          value={editDraft.guests_count ?? 1}
                          onChange={(e) =>
                            setEditDraft((d) => ({ ...d, guests_count: Number(e.target.value) }))
                          }
                          className="w-16 rounded border border-silver/30 bg-navy/60 px-2 py-1"
                        />
                      ) : (
                        r.guests_count
                      )}
                    </td>
                    <td className="p-3 max-w-[200px] whitespace-pre-wrap">
                      {editing ? (
                        <textarea
                          rows={2}
                          value={editDraft.companions ?? ""}
                          onChange={(e) => setEditDraft((d) => ({ ...d, companions: e.target.value }))}
                          className="w-full rounded border border-silver/30 bg-navy/60 px-2 py-1"
                        />
                      ) : (
                        r.companions || "—"
                      )}
                    </td>
                    <td className="p-3 max-w-[220px] whitespace-pre-wrap text-silver">
                      {editing ? (
                        <textarea
                          rows={2}
                          value={editDraft.message ?? ""}
                          onChange={(e) => setEditDraft((d) => ({ ...d, message: e.target.value }))}
                          className="w-full rounded border border-silver/30 bg-navy/60 px-2 py-1"
                        />
                      ) : (
                        r.message || "—"
                      )}
                    </td>
                    <td className="p-3 text-xs text-silver">
                      {new Date(r.created_at).toLocaleString("pt-BR")}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        {editing ? (
                          <>
                            <button onClick={saveEdit} className="rounded p-1.5 hover:bg-silver/20">
                              <Check className="h-4 w-4 text-emerald-400" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="rounded p-1.5 hover:bg-silver/20"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(r)}
                              className="rounded p-1.5 hover:bg-silver/20"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteRsvp(r.id)}
                              className="rounded p-1.5 hover:bg-silver/20"
                            >
                              <Trash2 className="h-4 w-4 text-red-400" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-sm border border-silver/30 bg-navy/40 p-4 text-center">
      <div className="font-display text-3xl text-paper">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-silver">{label}</div>
    </div>
  );
}
